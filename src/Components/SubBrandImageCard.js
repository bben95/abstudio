import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const SubBrandImageCard = ({ breed, subBreed }) => {
	console.log(breed, subBreed);
	const [image, setImage] = useState("");
	useEffect(() => {
		fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
			.then((res) => res.json())
			.then((data) => setImage(data.message));
	}, [subBreed]);

	return (
		<Stack
			sx={{ width: "120px", height: "160px" }}
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<img
				style={{ width: "120px", height: "120px" }}
				src={image ? image : ""}
			/>
			<Typography>{subBreed}</Typography>
		</Stack>
	);
};

export default SubBrandImageCard;
