
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient('https://ohzgpjefoluggghlmmud.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oemdwamVmb2x1Z2dnaGxtbXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MDA4ODIsImV4cCI6MjA2NjM3Njg4Mn0.xKnpMAffTZc9pRNKgz6gcC6WsWHB0vBY46cGTOpw1Gc')

// Upload file using standard upload
export async function uploadFile(file) {

  console.log('Uploading file:', file);
  const { data, error } = await supabase.storage.from('ecommerceimages/productsImages').upload(file.name, file, {
    contentType: ('image/jpeg', 'image/jpg', 'image/png', 'image/webp')
  })
  const dataURL = `https://ohzgpjefoluggghlmmud.supabase.co/storage/v1/object/public/ecommerceimages/productsImages/${file.name}`;

  if (error) {
    console.error('Error uploading file:', error);
  } else {

    console.log('File uploaded successfully:', data);
    return dataURL;
  }
}
