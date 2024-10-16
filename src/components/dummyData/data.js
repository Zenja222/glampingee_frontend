
const Booking = (props) => {
    const classes = 'booking' + props.className;
    return <div> classname={classes}>{props.children}
    </div>;
};

export default Booking