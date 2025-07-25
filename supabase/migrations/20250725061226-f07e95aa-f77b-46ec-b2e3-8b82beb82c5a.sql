-- Insert admin user with specified credentials
INSERT INTO public.admin_users (email, password_hash)
VALUES ('madweedscientist@gmail.com', encode(digest('420br549', 'sha256'), 'base64'))
ON CONFLICT (email) DO UPDATE SET 
  password_hash = encode(digest('420br549', 'sha256'), 'base64'),
  created_at = now();