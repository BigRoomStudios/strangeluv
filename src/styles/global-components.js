const Styled = require('styled-components').default;
const { Paper } = require('@material-ui/core');

module.exports = {

    FormWrapper: Styled(Paper)`
        max-width: 500px;
        margin: auto;
        padding: 1.5rem;
    `,

    TextWrapper: Styled.div`
        margin: 0 0 1.5rem;
    `,

    ButtonWrapper: Styled.div`
        display: flex;
        justify-content: space-between;
        margin: 0 0 1.5rem;
    `,

    PageWrapper: Styled.div`
        padding: 0px 16px;
        margin: 0 auto;

        @media (min-width: 600px) {
            padding: 0 24px;
        }
    `
};
