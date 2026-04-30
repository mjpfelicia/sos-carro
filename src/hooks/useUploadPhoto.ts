import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUploadPhoto() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File, providerId: string) => {
    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${providerId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('provider-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('provider-photos')
        .getPublicUrl(fileName);

      // Create record in provider_photos table
      await supabase.from('provider_photos').insert({
        provider_id: providerId,
        photo_url: publicUrl,
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, progress };
}
