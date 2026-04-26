-- =====================================================
-- SOS CARROS - Database Schema for Supabase
-- =====================================================
-- PostgreSQL 15+ com Supabase
-- Versão: 1.0.0
-- =====================================================

-- =====================================================
-- 1. EXTENSÕES NECESSÁRIAS
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- Para geolocalização (opcional)

-- =====================================================
-- 2. ENUMS
-- =====================================================

-- Status do usuário
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');

-- Tipo de usuário
CREATE TYPE user_type AS ENUM ('customer', 'provider', 'admin');

-- Status do booking
CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
);

-- Categoria de serviço
CREATE TYPE service_category AS ENUM (
  'mecanica',
  'eletrica',
  'guincho',
  'pneus',
  'funilaria',
  'vidracaria',
  'chaveiro',
  'lavagem',
  'outros'
);

-- =====================================================
-- 3. TABELAS PRINCIPAIS
-- =====================================================

-- 3.1. PERFIS DE USUÁRIOS (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  user_type user_type NOT NULL DEFAULT 'customer',
  status user_status NOT NULL DEFAULT 'pending_verification',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  
  -- Metadados
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index para busca rápida
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_status ON profiles(status);

-- 3.2. PRESTADORES DE SERVIÇO
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Informações do negócio
  business_name TEXT NOT NULL,
  category service_category NOT NULL,
  categories_offered service_category[] DEFAULT '{}',
  
  -- Descrição
  bio TEXT,
  specialties TEXT[],
  
  -- Localização
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Brasil',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Contato
  phone TEXT NOT NULL,
  whatsapp TEXT,
  website TEXT,
  
  -- Avaliação e reputação
  rating DECIMAL(3, 2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  
  -- Preço
  price_from DECIMAL(10, 2),
  currency TEXT DEFAULT 'BRL',
  
  -- Disponibilidade
  is_available BOOLEAN DEFAULT true,
  response_time TEXT,
  
  -- Badges e certificações
  badges TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes para performance
CREATE INDEX idx_providers_category ON providers(category);
CREATE INDEX idx_providers_city ON providers(city);
CREATE INDEX idx_providers_state ON providers(state);
CREATE INDEX idx_providers_rating ON providers(rating DESC);
CREATE INDEX idx_providers_is_available ON providers(is_available);
CREATE INDEX idx_providers_location ON providers(latitude, longitude);
CREATE INDEX idx_providers_user_id ON providers(user_id);

-- 3.3. SERVIÇOS OFERECIDOS
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  category service_category NOT NULL,
  
  -- Preço
  price DECIMAL(10, 2) NOT NULL,
  price_type TEXT DEFAULT 'fixed', -- fixed, hourly, from
  currency TEXT DEFAULT 'BRL',
  
  -- Duração estimada
  estimated_duration INTEGER, -- em minutos
  
  -- Disponibilidade
  is_available BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_price ON services(price);

-- 3.4. DISPONIBILIDADE DO PRESTADOR
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Dom, 6=Sáb
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_availability_provider_id ON availability(provider_id);
CREATE INDEX idx_availability_day ON availability(day_of_week);

-- 3.5. BOOKINGS (RESERVAS/SOLICITAÇÕES)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relacionamentos
  customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  
  -- Detalhes do serviço
  service_description TEXT NOT NULL,
  service_category service_category NOT NULL,
  
  -- Localização do atendimento
  service_address TEXT NOT NULL,
  service_city TEXT NOT NULL,
  service_state TEXT NOT NULL,
  service_zip_code TEXT NOT NULL,
  service_latitude DECIMAL(10, 8),
  service_longitude DECIMAL(11, 8),
  
  -- Agendamento
  scheduled_at TIMESTAMPTZ NOT NULL,
  estimated_duration INTEGER, -- minutos
  
  -- Preço
  quoted_price DECIMAL(10, 2),
  final_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'BRL',
  
  -- Status
  status booking_status NOT NULL DEFAULT 'pending',
  
  -- Informações adicionais
  notes TEXT,
  customer_notes TEXT,
  provider_notes TEXT,
  
  -- Cancelamento
  cancelled_by UUID REFERENCES profiles(id),
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Indexes críticos
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- 3.6. AVALIAÇÕES E REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relacionamentos
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewed_provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  
  -- Avaliação
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Detalhes
  title TEXT,
  comment TEXT,
  
  -- Categorias de avaliação
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  price_rating INTEGER CHECK (price_rating >= 1 AND price_rating <= 5),
  
  -- Resposta do prestador
  provider_response TEXT,
  provider_response_at TIMESTAMPTZ,
  
  -- Moderação
  is_visible BOOLEAN DEFAULT true,
  is_flagged BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_provider_id ON reviews(reviewed_provider_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- 3.7. FOTOS DOS PRESTADORES
CREATE TABLE provider_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  
  photo_url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_provider_photos_provider_id ON provider_photos(provider_id);
CREATE INDEX idx_provider_photos_is_primary ON provider_photos(is_primary);

-- 3.8. NOTIFICAÇÕES
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL, -- booking_request, booking_confirmed, review_received, etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Dados relacionados
  related_booking_id UUID REFERENCES bookings(id),
  related_review_id UUID REFERENCES reviews(id),
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- 4. TRIGGERS E FUNÇÕES
-- =====================================================

-- 4.1. Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas com updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_availability_updated_at
  BEFORE UPDATE ON availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4.2. Criar profile automaticamente ao criar usuário
CREATE OR REPLACE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_new_user();

-- 4.3. Atualizar rating e reviews_count do provider
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE providers
    SET 
      reviews_count = reviews_count + 1,
      rating = (
        SELECT AVG(rating)
        FROM reviews
        WHERE reviewed_provider_id = NEW.reviewed_provider_id
        AND is_visible = true
      )
    WHERE id = NEW.reviewed_provider_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_visible = true AND NEW.is_visible = false THEN
      UPDATE providers
      SET 
        reviews_count = reviews_count - 1,
        rating = (
          SELECT AVG(rating)
          FROM reviews
          WHERE reviewed_provider_id = NEW.reviewed_provider_id
          AND is_visible = true
        )
      WHERE id = NEW.reviewed_provider_id;
    ELSIF OLD.is_visible = false AND NEW.is_visible = true THEN
      UPDATE providers
      SET 
        reviews_count = reviews_count + 1,
        rating = (
          SELECT AVG(rating)
          FROM reviews
          WHERE reviewed_provider_id = NEW.reviewed_provider_id
          AND is_visible = true
        )
      WHERE id = NEW.reviewed_provider_id;
    ELSE
      UPDATE providers
      SET rating = (
        SELECT AVG(rating)
        FROM reviews
        WHERE reviewed_provider_id = NEW.reviewed_provider_id
        AND is_visible = true
      )
      WHERE id = NEW.reviewed_provider_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE providers
    SET 
      reviews_count = reviews_count - 1,
      rating = (
        SELECT AVG(rating)
        FROM reviews
        WHERE reviewed_provider_id = OLD.reviewed_provider_id
        AND is_visible = true
      )
    WHERE id = OLD.reviewed_provider_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_review_insert
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_provider_rating();

CREATE TRIGGER after_review_update
  AFTER UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_provider_rating();

CREATE TRIGGER after_review_delete
  AFTER DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_provider_rating();

-- 4.4. Incrementar total_bookings quando booking é completado
CREATE OR REPLACE FUNCTION increment_provider_bookings()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE providers
    SET total_bookings = total_bookings + 1
    WHERE id = NEW.provider_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_booking_completed
  AFTER UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION increment_provider_bookings();

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 5.1. Políticas para PROFILES
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public can view basic provider profiles"
  ON profiles FOR SELECT
  USING (user_type = 'provider' AND status = 'active');

-- 5.2. Políticas para PROVIDERS
CREATE POLICY "Anyone can view active providers"
  ON providers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can create their own provider profile"
  ON providers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can update their own profile"
  ON providers FOR UPDATE
  USING (auth.uid() = user_id);

-- 5.3. Políticas para SERVICES
CREATE POLICY "Anyone can view services from active providers"
  ON services FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM providers
      WHERE providers.id = services.provider_id
      AND providers.is_active = true
    )
  );

CREATE POLICY "Providers can manage their own services"
  ON services FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM providers
      WHERE providers.id = services.provider_id
      AND providers.user_id = auth.uid()
    )
  );

-- 5.4. Políticas para AVAILABILITY
CREATE POLICY "Anyone can view availability"
  ON availability FOR SELECT
  USING (true);

CREATE POLICY "Providers can manage their own availability"
  ON availability FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM providers
      WHERE providers.id = availability.provider_id
      AND providers.user_id = auth.uid()
    )
  );

-- 5.5. Políticas para BOOKINGS
CREATE POLICY "Customers can view their own bookings"
  ON bookings FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Providers can view bookings for their services"
  ON bookings FOR SELECT
  USING (provider_id IN (
    SELECT id FROM providers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can update their own bookings"
  ON bookings FOR UPDATE
  USING (customer_id = auth.uid());

CREATE POLICY "Providers can update bookings they provide"
  ON bookings FOR UPDATE
  USING (provider_id IN (
    SELECT id FROM providers WHERE user_id = auth.uid()
  ));

-- 5.6. Políticas para REVIEWS
CREATE POLICY "Anyone can view visible reviews"
  ON reviews FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Customers can create reviews for their bookings"
  ON reviews FOR INSERT
  WITH CHECK (
    reviewer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = reviews.booking_id
      AND bookings.customer_id = auth.uid()
      AND bookings.status = 'completed'
    )
  );

-- 5.7. Políticas para PROVIDER_PHOTOS
CREATE POLICY "Anyone can view provider photos"
  ON provider_photos FOR SELECT
  USING (true);

CREATE POLICY "Providers can manage their own photos"
  ON provider_photos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM providers
      WHERE providers.id = provider_photos.provider_id
      AND providers.user_id = auth.uid()
    )
  );

-- 5.8. Políticas para NOTIFICATIONS
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- =====================================================
-- 6. VIEWS ÚTEIS
-- =====================================================

-- View para listagem de prestadores com informações consolidadas
CREATE VIEW provider_listings AS
SELECT 
  p.id,
  p.business_name,
  p.category,
  p.bio,
  p.city,
  p.state,
  p.latitude,
  p.longitude,
  p.rating,
  p.reviews_count,
  p.total_bookings,
  p.price_from,
  p.is_available,
  p.response_time,
  p.badges,
  pr.full_name as owner_name,
  pr.avatar_url,
  pr.phone,
  (
    SELECT json_agg(json_build_object('url', photo_url, 'caption', caption))
    FROM provider_photos
    WHERE provider_id = p.id
    ORDER BY is_primary DESC
  ) as photos,
  (
    SELECT COUNT(*)
    FROM availability
    WHERE provider_id = p.id AND is_active = true
  ) as availability_days
FROM providers p
JOIN profiles pr ON p.user_id = pr.id
WHERE p.is_active = true;

-- View para dashboard do prestador
CREATE VIEW provider_dashboard AS
SELECT 
  p.id as provider_id,
  p.business_name,
  p.rating,
  p.reviews_count,
  p.total_bookings,
  (
    SELECT COUNT(*) FROM bookings 
    WHERE provider_id = p.id AND status = 'pending'
  ) as pending_bookings,
  (
    SELECT COUNT(*) FROM bookings 
    WHERE provider_id = p.id AND status = 'confirmed'
  ) as confirmed_bookings,
  (
    SELECT COUNT(*) FROM bookings 
    WHERE provider_id = p.id AND status = 'in_progress'
  ) as in_progress_bookings,
  (
    SELECT COALESCE(SUM(final_price), 0) FROM bookings 
    WHERE provider_id = p.id AND status = 'completed'
    AND DATE(completed_at) >= DATE_TRUNC('month', CURRENT_DATE)
  ) as monthly_revenue
FROM providers p;

-- =====================================================
-- 7. DADOS INICIAIS (SEED)
-- =====================================================

-- Inserir categorias de exemplo na tabela de services (opcional)
-- Isso pode ser feito via aplicação também

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
