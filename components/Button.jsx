// Todo: Make this work!
// uses Tailwind CSS to style the button
// yarn add tailwindcss

const Button = ({ children }) => {
  function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  return <button onClick={createRipple}>{children}</button>;
};

// scoped css, specific to the ripple effect
<style>
  {`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

button {
  position: relative;
  overflow: hidden;
  transition: background 400ms;
  color: #fff;
  background-color: #6200ee;
  padding: 1rem 2rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  outline: 0;
  border: 0;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3); /* black with 30% opacity */
  cursor: pointer;
}

span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: rgba(255, 255, 255, 0.7);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
  `}
</style>;

export default Button;

// usage example
// const SomeComponent = () => {
//   return <Button>Click Me</Button>;
// };

// resources
// css tricks: https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
// svelte implementation: https://svelte.dev/repl/fe32402f55aa46ee8faf53d937795145?version=3.29.0
// react codepen example: https://codepen.io/BretCameron/pen/ZEWJKbN
