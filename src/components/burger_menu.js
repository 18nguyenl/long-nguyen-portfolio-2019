import { css } from "@emotion/core"
import React from "react"

const BurgerMenu = () => (
    <button css={css`
        position: relative;

        vertical-align: center;
        `}>
        <div css={css`
            background: black;

            width: 27px;
            height: 4.5px;

            margin-top: 7px;

            &::before, &::after {
                content: "";

                position: absolute;
                z-index: -1;

                display: block;

                width: 27px;
                height: 4.5px;

                background: black;
            }

            &::before {
                top: 0;
            }

            &::after {
                top: 16px;
            }
        `}></div>
    </button>
)

export default BurgerMenu;