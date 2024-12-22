import { User } from '@/types';

interface LoginResponse {
  token: string;
  user: User;
}

export async function loginUser({ 
  email, 
  password 
}: { 
  email: string; 
  password: string; 
}): Promise<LoginResponse> {
  const response = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}