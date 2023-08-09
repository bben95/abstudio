import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IndividualBreed from "./IndividualBreed";

const ImageCard = ({ name }) => {
	const [image, setImage] = useState("");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		fetch(`https://dog.ceo/api/breed/${name}/images/random`)
			.then((res) => res.json())
			.then((data) => setImage(data.message));
	}, [name]);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Stack
				sx={{ width: "120px", height: "160px" }}
				direction="column"
				alignItems="center"
				justifyContent="center"
				onClick={handleOpen}
			>
				<img
					style={{ width: "120px", height: "120px" }}
					src={image ? image : ""}
				/>
				<Typography>{name}</Typography>
			</Stack>
			{open && (
				<IndividualBreed breed={name} open={open} handleClose={handleClose} />
			)}
		</>
	);
};

export default ImageCard;
