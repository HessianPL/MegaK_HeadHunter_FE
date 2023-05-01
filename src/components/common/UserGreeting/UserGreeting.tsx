interface Props {
    userName: string;
}

export const UserGreeting = (props: Props) => {
    return (
            <div className="container-fluid">
                <h1 className="my-5 ms-5 theme-text-light theme-bg-dark-2">Witaj {props.userName || "na stronie"}!</h1>
            </div>
    )
}