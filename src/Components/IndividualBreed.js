import React, { useEffect, useState } from "react";
import SubBrandImageCard from "./SubBrandImageCard";
import { Dialog, IconButton, Stack, Typography } from "@mui/material";

const IndividualBreed = ({ breed, open, handleClose }) => {
	const [subBreeds, setSubBreeds] = useState([]);
	useEffect(() => {
		fetch(`https://dog.ceo/api/breed/${breed}/list `)
			.then((res) => {
				let response = res.json();
				return response;
			})
			.then((data) => {
				console.log(data);
				setSubBreeds(data.message);
			})
			.catch((e) => console.log(e));
	}, []);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					width: "800px",
					minHeight: "400px",
					padding: "20px",
				},
			}}
		>
			{subBreeds.length > 0 ? (
				<>
					{" "}
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography>{breed}</Typography>
						<IconButton onClick={handleClose}>X</IconButton>
					</Stack>
					<Stack direction="row" flexWrap="wrap" gap="25px" padding="3%">
						{subBreeds.map((subBreed, id) => (
							<SubBrandImageCard breed={breed} subBreed={subBreed} key={id} />
						))}
					</Stack>
				</>
			) : (
				<Typography>No Sub breeds available</Typography>
			)}
		</Dialog>
	);
};

export default IndividualBreed;
