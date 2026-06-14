const Notification = ({message, type=''}) => {
    const messageStyle = {
        background: 'lightgray',
        color: 'green',
        fontSize: '1.5rem',
        padding: '10px',
        border: '2px solid green',
        borderRadius: '5px',
        marginBottom: '10px',
        textTransform: 'capitalize'
    }
    const errorStyle = {
        background: 'lightgray',
        color: 'red',
        fontSize: '1.5rem',
        padding: '10px',
        border: '2px solid red',
        borderRadius: '5px',
        marginBottom: '10px',
        textTransform: 'capitalize'
    }
    if (message === null) return null
    else if (type === "error") return (
        <div style={errorStyle}>{message}</div>
    )
    return <div style={messageStyle}>{message}</div>
}

export default Notification