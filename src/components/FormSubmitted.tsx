import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Button,
    Box,
} from "@mui/material";

interface SubmitSummaryProps {
    data: Record<string, any> | null; // JSON data from form
    onRestart?: () => void; // optional button handled
}

export const SubmitSummary: React.FC<SubmitSummaryProps> = ({ data, onRestart }) => {

    // General check for data
    const entries = Object.entries(data ?? {}).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
    );
    const audit = data?.audit
    const date = audit? data?.date : ""
    const time = audit? data?.time : ""
    const email = audit? data?.email : ""

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                ✅ OIA Energy form submitted
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Thank you for completing your energy assessment. Below is a summary of your responses.
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
                {entries.map(([key, value]) => (
                    <Grid item xs={12} md={6} key={key}>
                        <Card elevation={3} sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                                    {key.replaceAll("_", " ")}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1" color="text.primary">
                                    {typeof value === "boolean"
                                        ? value
                                            ? "Yes"
                                            : "No"
                                        : value.toString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {audit ? (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant="h6"> 📅 Energy audit schedulet for: {date} </Typography>
                    <Typography variant="h6"> Best time selected: {time} </Typography>
                    <Typography variant="body1"> More details to be send at: {email} </Typography>
                </Box>
            ) : (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant="h6">
                        No Further audits programmed
                    </Typography>
                </Box>
            )}

        </Box>
    );
};

export default SubmitSummary;
