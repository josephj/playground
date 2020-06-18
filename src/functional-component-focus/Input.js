import React from 'react';

export default ({id, value, onChange}) => (
    <div>
        <input type="number" value={value} onChange={e => onChange(id, e.target.value)}/>
    </div>
);