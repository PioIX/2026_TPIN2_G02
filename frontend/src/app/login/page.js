"use client"

export default function LoginPage() {
    let login=true
    return(
        <>
            { login ? (
                <>
                    <input type="mail"></input>
                    <input type="password"></input>
                    <button onClick={login}>Iniciar sesion</button>
                    <button onClick={changeCondREnder}></button>
                </>
            ):(
                <>
                    <input type="username"></input>
                    <input type="mail"></input>
                    <input type="password"></input>
                    <input type="file"></input>
                    <button onClick={register}>Registrarse</button>
                    <button onClick={changeCondREnder}></button>
                </>
            )}
                 
        </>
    )
    
}