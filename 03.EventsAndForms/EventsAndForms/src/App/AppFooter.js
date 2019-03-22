import React from 'react';
import Message from './Message'

const AppFooter = (props) => (<Message 
                                message={props.message} 
                                variant={props.variant} 
                                open={props.open}
                                handleClose={props.handleClose}
                            />);

export default AppFooter;