import React from 'react';
import {Ellipsis, Grid, Image} from "antd-mobile";


function Avatars(props) {
  const chosen = props.chosen
  const setChosen = props.setChosen

  return (
    Array.from(new Array(props.number), (val, index) => index).map(p => {
      return (
        <Grid.Item
          onClick={() => setChosen(p)}
          style={{
            'backgroundColor': chosen === p ? 'orange' : 'white',
          }}
          key={p}
        >
          <Image
            key={p}
            src={require(`../../assets/images/avatars/avatar${p + 1}.png`)}
          />
        </Grid.Item>
      )
    })
  );
}

function AvatarSelector(props) {
  return (
    <div>
      <Ellipsis direction='end' content={'Choose an avatar:'} style={{
        'fontSize': '16px',
      }}/>
      <Grid columns={5} style={{'--gap': '8px'}}>
        <Avatars chosen={props.avatar} setChosen={props.setAvatar} number={20}/>
      </Grid>
    </div>
  );
}

export default AvatarSelector;