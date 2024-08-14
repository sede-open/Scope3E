import redirect from 'utils/redirect';

interface IProps {
  url: string;
}

const RedirectTo = ({ url }: IProps) => {
  try {
    redirect(url);
  } catch {
    // Redirect not possible on server
  }
  return null;
};

export default RedirectTo;
