import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/Patients/Patients";
import Doctor from "./containers/Doctor/Doctor";
import Counter from "./containers/Counter/Counter";
import { configureStore } from "./redux/store";
import { Provider } from 'react-redux';

function App() {
  const store = configureStore();

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path={"/medicines"} exact component={Medicines} />
            <Route path={"/patients"} exact component={Patients} />
            <Route path={"/doctor"} exact component={Doctor} />
            <Route path={"/counter"} exact component={Counter} />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
