import React from 'react';
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Slider,
  Divider,
  Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const InvestmentFilters = ({
  selectedCategories,
  onCategoryToggle,
  searchQuery,
  onSearchChange,
  performanceRange,
  onPerformanceRangeChange,
  impactScoreRange,
  onImpactScoreRangeChange,
}) => {
  const categories = [
    { value: 'renewable_energy', label: 'Renewable Energy' },
    { value: 'clean_water', label: 'Clean Water' },
    { value: 'sustainable_agriculture', label: 'Sustainable Agriculture' },
    { value: 'green_buildings', label: 'Green Buildings' },
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <SearchIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1">Filter Investments</Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search investments..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle2" gutterBottom>
        Categories
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category.value}
            control={
              <Checkbox
                checked={selectedCategories.includes(category.value)}
                onChange={() => onCategoryToggle(category.value)}
                name={category.value}
              />
            }
            label={category.label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        Performance Range
      </Typography>
      <Slider
        value={performanceRange}
        onChange={(event, newValue) => onPerformanceRangeChange(newValue)}
        valueLabelDisplay="auto"
        min={-100}
        max={100}
        marks={[
          { value: -100, label: '-100%' },
          { value: 0, label: '0%' },
          { value: 100, label: '100%' },
        ]}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle2" gutterBottom>
        Impact Score Range
      </Typography>
      <Slider
        value={impactScoreRange}
        onChange={(event, newValue) => onImpactScoreRangeChange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        marks={[
          { value: 0, label: '0' },
          { value: 50, label: '50' },
          { value: 100, label: '100' },
        ]}
        sx={{ mb: 2 }}
      />

      <Box display="flex" flexWrap="wrap" gap={1}>
        {selectedCategories.map((category) => (
          <Chip
            key={category}
            label={categories.find(c => c.value === category)?.label}
            onDelete={() => onCategoryToggle(category)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Paper>
  );
};

export default InvestmentFilters; 