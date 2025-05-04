export default function Feature({identity, classNameForLabel, clasNameForInput, children, as : Componet = "input",   ...rest}){
    return(
        <div>
              <label htmlFor={identity} className={classNameForLabel}>
                {children}
              </label>
              <Componet
              name={identity}
              id={identity}
              className={clasNameForInput}
               {...rest}
              ></Componet>
        </div>
    )
}