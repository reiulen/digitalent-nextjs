import React from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
import { css } from '@emotion/react'

const LoadingPage = ({ loading }) => {
    const override = css`
        display: block;
        margin: 0 auto;
        position: fixed;
        top: 50%;
        left: 56%;
        z-index:999;
    `;
    return (
        <>
            <div className="loading text-center justify-content-center p-5" style={{ background: 'rgba(221, 222, 221, 0.32)', zIndex: '9', height: '100%', position: 'absolute', width: '100%' }}>
                <BounceLoader color='#3699FF' loading={loading} css={override} size={60} />
                <p style={{
                    display: 'block',
                    margin: '0 auto',
                    position: 'fixed',
                    top: '60%',
                    left: '54%',
                    zIndex: '999'
                }}>Sedang Memproses</p>
            </div>
        </>
    )
}

export default LoadingPage