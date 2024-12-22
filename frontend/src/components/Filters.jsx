import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  const [selectedSources, setSelectedSources] = useState(searchParams.getAll('source[]') || []);


  const [publishDate, setPublishDate] = useState(
    searchParams.get('publish_date') ? dayjs(searchParams.get('publish_date')) : null
  );

  const updateSearchParams = (key, value) => {
    if (value) {
      if (Array.isArray(value)) {
        searchParams.delete(key);
        value.forEach((val) => {
          searchParams.append(`${key}`, val)
        });
      }
      else {
        searchParams.set(key, value);
      }
    }
    else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const handleCheckboxChange = (source) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((item) => item !== source)
      : [...selectedSources, source];
    setSelectedSources(updatedSources);

    updateSearchParams('source[]', updatedSources);
  };

  const handleDateChange = (date) => {
    setPublishDate(date);
    updateSearchParams('publish_date', date ? date.format('YYYY-MM-DD') : '');
  };

  return (
    <Box sx={{ mt: 13 }}>
      <Typography variant="h6" gutterBottom>
        Advanced Filters
      </Typography>

      {/* Keyword Filter */}
      <FormGroup sx={{ my: 2 }}>
        <FormLabel sx={{ fontSize: 14, mb: 1 }}>Keyword</FormLabel>
        <TextField
          size="small"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            updateSearchParams('keyword', e.target.value.trim())
          }}
          placeholder="Enter any keyword"
        />
      </FormGroup>

      {/* Publish Date Filter */}
      <FormGroup>
        <FormLabel sx={{ fontSize: 14 }}>Publish Date</FormLabel>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: { width: '100%' },
                  },
                }}
                value={publishDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </FormGroup>

      {/* Source Filter */}
      <FormGroup sx={{ my: 2 }}>
        <FormLabel sx={{ fontSize: 14 }}>Source</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={selectedSources.includes('news_api')}
              onChange={() => handleCheckboxChange('news_api')}
            />
          }
          label="News API"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={selectedSources.includes('new_york_times')}
              onChange={() => handleCheckboxChange('new_york_times')}
            />
          }
          label="New York Times"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={selectedSources.includes('guardians')}
              onChange={() => handleCheckboxChange('guardians')}
            />
          }
          label="Guardians"
        />
      </FormGroup>
    </Box>
  );
};

export default Filters;
