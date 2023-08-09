import {
	Button,
	Dialog,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";

const CustomSearchDialog = ({ breeds, open, handleClose }) => {
	const [selectedBreed, setSelectedBreed] = useState();
	const [number, setNumber] = useState();
	const [images, setImage] = useState([]);

	const handleSelect = (e) => {
		setSelectedBreed(e.target.value);
	};
	const handleChange = (e) => {
		setNumber(e.target.value);
	};

	const getImages = () => {
		fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${number} `)
			.then((res) => res.json())
			.then((data) => setImage(data.message));
	};

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
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography>Custom Search</Typography>
				<IconButton onClick={handleClose}>X</IconButton>
			</Stack>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<FormControl size="small">
					<InputLabel>Select Breed</InputLabel>
					<Select
						label="Select Breed"
						onChange={handleSelect}
						value={selectedBreed}
						sx={{ width: "150px" }}
					>
						{breeds.map((breed) => (
							<MenuItem value={breed}>{breed}</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					type="number"
					size="small"
					onChange={handleChange}
					placeholder="Number of Images"
				/>
			</Stack>
			<Button
				sx={{
					color: "white",
					backgroundColor: "green",
					width: "200px",
					marginTop: "5%",
					marginLeft: "35%",
				}}
				variant="contained"
				onClick={getImages}
				disabled={!selectedBreed || !number}
			>
				Get Images
			</Button>
			<Stack direction="row" flexWrap="wrap" gap="25px" padding="3%">
				{images.map((image, id) => (
					<Stack
						sx={{ width: "120px", height: "120px" }}
						direction="column"
						alignItems="center"
						justifyContent="center"
						key={id}
					>
						<img style={{ width: "120px", height: "120px" }} src={image} />
					</Stack>
				))}
			</Stack>
		</Dialog>
	);
};

export default CustomSearchDialog;
