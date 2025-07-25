-- Update the admin password hash to match the btoa encoding expected by the login code
UPDATE admin_users 
SET password_hash = 'NDIwYnI1NDk=' 
WHERE email = 'madweedscientist@gmail.com';