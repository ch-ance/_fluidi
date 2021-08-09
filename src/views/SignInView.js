import { Container } from "@material-ui/core";
import PageFooter from "../components/PageFooter";
import SignIn from "../components/SignIn";

const SignInView = () => {
  return (
    <Container
      style={{
        backgroundColor: "red",
        height: "100%",
      }}
    >
      <SignIn />
    </Container>
  );
};

export default SignInView;
