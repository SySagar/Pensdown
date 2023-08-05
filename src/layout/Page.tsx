import { Stack } from "@mui/material"
import { motion, Variants } from "framer-motion"

interface IChildren {
    children: JSX.Element
}

const variants: Variants = {
	hidden: {
		x: 0,
		y: -200,
		opacity: 0
	},
	enter: {
		x: 0,
		y: 0,
		opacity: 1
	},
	exit: {
		x: 0,
		y: 200,
		opacity: 0
	}
}

const Page = ({ children }: IChildren): JSX.Element => {
	return (
		<Stack
			component={motion.main}
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{
				ease: 'linear'			
			}}
			flexGrow={1}
		>
			{ children }
		</Stack>
	)
}

export default Page