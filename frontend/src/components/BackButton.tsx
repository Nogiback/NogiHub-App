import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const nav = useNavigate();

  return (
    <button onClick={() => nav(-1)} className='btn btn-circle btn-ghost'>
      <ArrowLeft />
    </button>
  );
}
