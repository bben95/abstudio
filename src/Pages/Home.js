import {
	AppBar,
	Box,
	Button,
	Stack,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageCard from "../Components/ImageCard";
import CustomSearchDialog from "../Components/CustomSearchDialog";
import SubBrandImageCard from "../Components/SubBrandImageCard";
import IndividualBreed from "../Components/IndividualBreed";

const Home = () => {
	const [breed, setBreed] = useState({});
	const [list, setList] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetch(`https://dog.ceo/api/breeds/list/all`)
			.then((res) => {
				let response = res.json();
				return response;
			})
			.then((data) => {
				setBreed(data.message);
				setList(Object.keys(data.message));
			})
			.catch((e) => console.log(e));
	}, []);

	const searchBreed = (searchValue) => {
		if (searchValue.trim() === "") {
			setList(Object.keys(breed));
		} else {
			const filteredList = Object.keys(breed).filter((breedName) =>
				breedName.toLowerCase().includes(searchValue.toLowerCase())
			);
			setList(filteredList);
		}
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					display: "flex",
					flexDirection: "row",
					backgroundColor: "blue",
				}}
			>
				<Toolbar
					sx={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h6" sx={{ marginLeft: "40%" }}>
						Dog Gallery
					</Typography>
					<Button
						sx={{
							color: "white",
							backgroundColor: "green",
						}}
						variant="contained"
						onClick={handleOpen}
					>
						Custom Search
					</Button>
					<CustomSearchDialog
						open={open}
						handleClose={handleClose}
						breeds={Object.keys(breed)}
					/>
				</Toolbar>
			</AppBar>

			<TextField
				size="small"
				placeholder="Type here to filter by brand"
				sx={{
					marginTop: "2%",
					width: "45%",
					marginLeft: "27%",
				}}
				onChange={(e) => {
					searchBreed(e.target.value);
				}}
			/>
			<Stack direction="row" flexWrap="wrap" gap="25px" padding="3%">
				{list.map((breed, id) => (
					<ImageCard name={breed} key={id} />
				))}
			</Stack>
		</Box>
	);
};

export default Home;
