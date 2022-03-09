import React from 'react';
import {
  Button, Popover, OverlayTrigger,
} from 'react-bootstrap';
import { ColorPicker, useColor, toColor } from 'react-color-palette';

const ColorField = ({ value, onChange, placement, variant = 'light' }) => {
  const [color, setColor] = useColor('hex', value);

  return (
    <>

      <OverlayTrigger
        trigger="click"
        placement={placement}
        rootClose={true}
        overlay={(
          <Popover>
            <Popover.Content>
              <ColorPicker
              
                width={220}
                height={140}
                color={color}
                onChange={(c) => {
                  setColor(c);
                  onChange(c.hex);
                }}
                hideRGB
                hideHEX
                hideHSV
                dark
              />
            </Popover.Content>
          </Popover>
    )}
      >

        <Button variant={variant}><span style={{
          display: 'inline-block', width: '12px', height: '12px', background: color.hex, 
        }}
        />
          {color.hex} 
        </Button>
      </OverlayTrigger>
    </>
  ); 
};
export default ColorField;
