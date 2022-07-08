import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/Patients/Patients";
import Doctor from "./containers/Doctor/Doctor";
function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={"/medicines"} exact component={Medicines}  />
          <Route path={"/patients"} exact component={Patients}  />
          <Route path={"/doctor"} exact component={Doctor} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
