import React, { useState } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';

export default function SummaryForm({ setOrderPhase }) {
  const [isChecked, setIsChecked] = useState(false);

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant='primary'
        onClick={() => setOrderPhase('completed')}
        disabled={!isChecked}
      >
        Confirm order
      </Button>
    </Form>
  );
}
