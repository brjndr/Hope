import { useAuth } from "@auth/useAuth";
import {
  Container,
  Title,
  Message,
  Button
} from "./LoginPage.styles";

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <Container>
      <Title>Welcome</Title>
      <Message>Please login to continue</Message>
      <Button onClick={login}>Login with SSO</Button>
    </Container>
  );
};

export default LoginPage;
