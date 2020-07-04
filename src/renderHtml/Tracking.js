import React from 'react';
import { RunOnClient } from './shared';

const GA_ID = 'UA-159096556-2';

const script = (gaId) => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId);
}

const Tracking = () => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
    <RunOnClient func={script} args={[GA_ID]}/>
  </>
);

export default Tracking;