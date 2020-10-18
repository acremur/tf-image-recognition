import React from 'react'
import { Route } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AnimatedRoute({children, ...rest}) {
    return (
        <Route {...rest}>
            <motion.div 
                initial={{ x: 1200}} 
                animate={{ x: 0, transition: { duration: 1 }  }}
                exit={{ scale: 0 }}
            >
                {children}
            </motion.div>
        </Route>
    )
}
