import React from 'react';
import AdSense from 'react-adsense';



const GoogleadComponent = () => {
    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7359253418301490"
crossorigin="anonymous"></script>
<!-- testAds -->
<ins class="adsbygoogle"
style="display:block"
data-ad-client="ca-pub-7359253418301490"
data-ad-slot="5676345076"
data-ad-format="auto"
data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script> */}



    return (
        <div className="d-flex justify-center">
            {/* <h1>Your Component</h1> */}
            <AdSense.Google
                client="ca-pub-7359253418301490"
                slot="5676345076"
                style={{ display: 'block' }}
                format='auto'
                responsive='true'
                layoutKey='-gw-1+2a-9x+5c'
            />
        </div>
    )
}

export default GoogleadComponent
