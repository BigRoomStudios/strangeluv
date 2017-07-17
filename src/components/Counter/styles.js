
const styled = require('styled-components').default;
const { Button } = require('styles'); // global styles

module.exports = {
    CounterContainer: styled.h2`
        margin: 1em auto;
    `,
    CounterText: styled.span`
        font-weight: bold;
        color: rgb(25, 200, 25);
    `,
    Button: Button.extend`
        margin: 0 5px;

        ${''/* scss is supported! */}
        &:active {
            background-color: rgb(25, 200, 25);
            color: white;
        }
    `
};
