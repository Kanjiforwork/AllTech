export default function Feature({identity, classNameForLabel, clasNameForInput, children,    ...rest}){
    return(
        <div>
              <label htmlFor={identity} className={classNameForLabel}>
                {children}
              </label>
              <input
              name={identity}
              id={identity}
              className={clasNameForInput}
               {...rest}
              />
        </div>
    )
}