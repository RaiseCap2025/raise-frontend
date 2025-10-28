import React, { useState } from "react";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { QueryAPI } from "../../api/endpoints/snowflakeQuery.api";
import snowflakeQuery from "../../constants/snowflakeQuery.ts";

// console.log("View Query:", viewQuery);
// console.log("Group By Query:", viewGroupByQuery);
// console.log("SQL Query:", viewSimpleQuery);
// console.log("SQL Query:", createTableQuery);
// console.log("SQL Query:", insertDataQuery);
// console.log("SQL Query:", createTableQueryOld);
// console.log("SQL Query:", insertDataQueryOld);

const ExecuteQuery: React.FC = () => {
    const [warehouse, setWarehouse] = useState("SNOW_CAP_SPC");
    const [database, setDatabase] = useState("SNOW_CAPGE_SPC");
    const [schema, setSchema] = useState("SNOW_CAP_RAISE");
    const [query, setQuery] = useState(snowflakeQuery.viewSimpleQuery);
    // const [warehouse, setWarehouse] = useState("");
    // const [database, setDatabase] = useState("");
    // const [schema, setSchema] = useState("");
    // const [tableName, setTableName] = useState("");
    const [headers, setHeaders] = useState<{ name: string }[]>([]);
    const [data, setData] = useState<string[][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const payload = {
                timeout: 60,
                warehouse,
                database,
                schema,
                statement: query,
            };
            const response = await QueryAPI.query(JSON.stringify(payload));
            setHeaders(response.data?.resultSetMetaData?.rowType || []);
            setData(response.data?.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
            setHeaders([]);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Execute Query in Snowflake
            </Typography>
            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <TextField
                        label="Warehouse"
                        variant="outlined"
                        value={warehouse}
                        onChange={(e) => setWarehouse(e.target.value)}
                    />
                    <TextField
                        label="Database"
                        variant="outlined"
                        value={database}
                        onChange={(e) => setDatabase(e.target.value)}
                    />
                    <TextField
                        label="Schema"
                        variant="outlined"
                        value={schema}
                        onChange={(e) => setSchema(e.target.value)}
                    />
                </div>
                <TextField
                    label="Query"
                    variant="outlined"
                    value={query}
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchData}
                    disabled={loading}
                    style={{ alignSelf: "flex-start" }}
                >
                    {loading ? "Loading..." : "Execute"}
                </Button>
            </div>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.length > 0 &&
                                headers.map((header) => (
                                    <TableCell key={header.name}>{header.name}</TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {row.map((value, idx) => (
                                    <TableCell key={idx}>
                                        {value === "true" ? (
                                            <span style={{ color: "green" }}>✔</span>
                                        ) : value === "false" ? (
                                            <span style={{ color: "red" }}>✘</span>
                                        ) : (
                                            value
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ExecuteQuery;