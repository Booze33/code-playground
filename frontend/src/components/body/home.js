import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../redux/auth/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return(
    <div>
      <h1>Tisloh</h1>
      <button onClick={handleSignOut} type="button">
        Sign Out
      </button>
    </div>
  )
}

export default Home;