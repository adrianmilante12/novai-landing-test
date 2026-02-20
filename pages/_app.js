// pages/_app.js
import '../styles/globals.css';
import GlobalScripts from '../components/GlobalScripts'; // <-- import the script wrapper

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalScripts />  {/* <-- runs all your scripts globally */}
    </>
  );
}
