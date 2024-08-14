import { PageHead } from 'components/PageHead';
import { redirectWhenLoggedIn } from 'components/RedirectWhenLoggedIn';
import { Login } from 'containers/Login';
import { PageWrapper } from 'layouts/PageWrapper';
import { abcdGray } from 'styles/colours';

const LoginPage = () => {
  return (
    <>
      <PageHead />
      <PageWrapper background={abcdGray} fillHeight>
        <Login />
      </PageWrapper>
    </>
  );
};

export default redirectWhenLoggedIn(LoginPage, '/dashboard');
