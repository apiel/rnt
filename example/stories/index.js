import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { specs, describe, it } from 'storybook-addon-specifications';

storiesOf('Button', module)
    .add('with text', () => (
        <Button>Hello Button</Button>
    ))
    .add('with some emoji', () => (
        <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    ))
    .add('Hello World', function () {
        const story =
          <button onClick={console.log('Hello World')}>
            Hello World
          </button>;
      
        specs(() => describe('Hello World', function () {
          it('Should have the Hello World label', function () {
            // let output = mount(story);
            expect('a').toContain('Hello World');
          });
        }));
      
        return story;
      });