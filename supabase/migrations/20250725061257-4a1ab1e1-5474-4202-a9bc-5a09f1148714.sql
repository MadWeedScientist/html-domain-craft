-- Update admin user with correct base64 password encoding that matches AdminLoginPage
UPDATE public.admin_users 
SET password_hash = 'NDIwYnI1NDk='  -- This is btoa('420br549')
WHERE email = 'madweedscientist@gmail.com';