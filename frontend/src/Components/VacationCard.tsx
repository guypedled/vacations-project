import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function VacationCard({ vacation, isAdmin, onLikeToggle, onDelete }: any) {
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  /*
    Confirm before delete (ADMIN ONLY)
  */
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vacation?"
    );

    if (confirmDelete) {
      onDelete(vacation.id);
    }
  };

  return (
    <Card
      sx={{
        width: 300,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      {/* IMAGE */}
      <img
        src={`http://localhost:3001/uploads/${vacation.image}`}
        alt={vacation.destination}
        onError={(e: any) => {
          e.target.src =
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
        }}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Typography variant="h6">{vacation.destination}</Typography>

        <Typography sx={{ mt: 1 }}>
          {vacation.description}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Start: {formatDate(vacation.startDate)}
        </Typography>

        <Typography>
          End: {formatDate(vacation.endDate)}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Price: ${vacation.price}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Likes: {vacation.likes}
        </Typography>

        {/* ❌ ADMIN לא יכול לעשות LIKE */}
        {!isAdmin && (
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              onLikeToggle(vacation.id, vacation.isLiked)
            }
          >
            {vacation.isLiked ? "UNLIKE" : "LIKE"}
          </Button>
        )}

        {/* ADMIN ACTIONS */}
        {isAdmin && (
          <>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() =>
                navigate(`/edit-vacation/${vacation.id}`)
              }
            >
              EDIT
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 1 }}
              onClick={handleDeleteClick}
            >
              DELETE
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default VacationCard;