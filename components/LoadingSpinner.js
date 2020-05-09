import React from 'react';
const LoadingSpinner = () => (
  <div style={{width: '100%', marginTop: '15px', display: 'flex', justifyContent: 'center', fontFamily: 'HK Grotesk', fontWeight: '600'}}>
    {/*<i class="fas fa-spinner fa-spin" style={{fontFamily: 'FontAwesome'}}></i>*/}
    <div>
        <i style={{textAlign: 'center'}} className="fas fa-circle-notch fa-spin" />&nbsp;&nbsp;Načítavam...
    </div>
  </div>
);

export default LoadingSpinner;