import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface Tip {
  id: number;
  title: string;
  content: string;
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Understanding Basic Budgeting',
    description: 'Learn the fundamentals of creating and maintaining a successful budget.',
    imageUrl: 'https://source.unsplash.com/random/400x200?budget',
    category: 'Budgeting',
  },
  {
    id: 2,
    title: 'Investment Basics',
    description: 'A comprehensive guide to getting started with investing.',
    imageUrl: 'https://source.unsplash.com/random/400x200?investment',
    category: 'Investing',
  },
  {
    id: 3,
    title: 'Saving for Retirement',
    description: 'Essential strategies for building a secure retirement fund.',
    imageUrl: 'https://source.unsplash.com/random/400x200?retirement',
    category: 'Retirement',
  },
];

const tips: Tip[] = [
  {
    id: 1,
    title: 'Start Early',
    content: 'The earlier you begin saving and investing, the more time your money has to grow through compound interest.',
    category: 'General',
  },
  {
    id: 2,
    title: 'Diversify Your Investments',
    content: 'Spread your investments across different asset classes to reduce risk and increase potential returns.',
    category: 'Investing',
  },
  {
    id: 3,
    title: 'Emergency Fund First',
    content: 'Build an emergency fund with 3-6 months of expenses before starting to invest.',
    category: 'Savings',
  },
  {
    id: 4,
    title: 'Track Your Spending',
    content: 'Keep track of all your expenses to identify areas where you can cut back and save more.',
    category: 'Budgeting',
  },
];

const Education = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Financial Education
      </Typography>

      <Grid container spacing={3}>
        {/* Featured Articles */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Featured Articles
          </Typography>
          <Grid container spacing={3}>
            {articles.map((article) => (
              <Grid item xs={12} md={4} key={article.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl}
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {article.description}
                    </Typography>
                    <Button variant="contained" color="primary">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Financial Tips */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Essential Financial Tips
            </Typography>
            <List>
              {tips.map((tip, index) => (
                <React.Fragment key={tip.id}>
                  <ListItem>
                    <ListItemText
                      primary={tip.title}
                      secondary={tip.content}
                    />
                  </ListItem>
                  {index < tips.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Learning Resources */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Learning Resources
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Online Courses"
                  secondary="Access free financial education courses from top institutions"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Financial Calculators"
                  secondary="Use our suite of calculators for budgeting, investing, and retirement planning"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Glossary"
                  secondary="Learn financial terms and concepts with our comprehensive glossary"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Webinars"
                  secondary="Watch live and recorded webinars from financial experts"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Interactive Tools */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Interactive Tools
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Budget Calculator</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Create and analyze your monthly budget
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Try Calculator
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Investment Calculator</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Plan your investment strategy
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Try Calculator
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Retirement Planner</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Plan for your retirement
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Try Calculator
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Education; 