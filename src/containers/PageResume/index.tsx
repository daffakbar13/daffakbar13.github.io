import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import ReactToPrint from 'react-to-print'
import { getPersonalInformations } from 'src/api/personal-information'
import { Button, PaperA4, PrintPreview } from 'src/components'
import { personalInformation } from 'src/data'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailIcon from '@mui/icons-material/Mail'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PlaceIcon from '@mui/icons-material/Place'

function ContentTemplate(props: React.PropsWithChildren & { title: string }) {
  const { title, children } = props
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  )
}

export default function PageResume() {
  const { data, isSuccess } = useQuery<typeof personalInformation>('data', getPersonalInformations)
  const printRef = React.useRef<HTMLElement>(null)
  const actionArea = (
    <ReactToPrint
      onBeforeGetContent={() => {
        printRef.current?.setAttribute('style', 'overflow: unset; padding: 0')
      }}
      onAfterPrint={() => {
        printRef.current?.removeAttribute('style')
      }}
      trigger={() => (
        <Button variant="contained" disableElevation>
          Print Resume
        </Button>
      )}
      content={() => printRef.current}
      documentTitle=""
      pageStyle={'@page { size: auto; margin: 1.5rem }'}
    />
  )
  return (
    <PrintPreview actionArea={actionArea}>
      <PaperA4 ref={printRef}>
        {isSuccess && (
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 'inherit' } }}
          >
            <Grid container spacing={2}>
              <Grid item xs="auto">
                <Avatar
                  alt="Daffa"
                  src={data.picture}
                  sx={{ width: 125, height: 125, margin: 'auto' }}
                  variant="square"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" fontWeight="bold">
                  {data.name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                  {data.title}
                </Typography>
                <Typography variant="subtitle2">{data.description}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <ContentTemplate title="Personal Information">
              <Typography variant="subtitle2">
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box>
                    <a href={`mailto:${data.email}`} target="_blank" rel="noreferrer">
                      <MailIcon /> {data.email}
                    </a>
                  </Box>
                  <Box>
                    <a href={`https://wa.me/${data.phone}`} target="_blank" rel="noreferrer">
                      <LocalPhoneIcon /> {data.phone}
                    </a>
                  </Box>
                  <Box>
                    <PlaceIcon /> {data.address}
                  </Box>
                  <Box>
                    <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer">
                      <LinkedInIcon /> {data.linkedin}
                    </a>
                  </Box>
                </Box>
              </Typography>
            </ContentTemplate>
            <ContentTemplate title="Experience">
              <Box display="flex" flexDirection="column" gap={2}>
                {data.experiences.map((e, i) => (
                  <Box key={i}>
                    <Typography variant="h6" component="span">
                      <Box display="flex" gap={1}>
                        <Box sx={{ color: 'primary.main' }}>{e.title}, </Box>
                        <Box>({e.company})</Box>
                        <Box color="grey" flexGrow={1} textAlign="right">
                          {e.from_date} - {e.to_date}
                        </Box>
                      </Box>
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Box>
                        <Typography variant="subtitle2">{e.description}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Responsibilities:</Typography>
                        {e.responsibilities.map((r, idx) => (
                          <Typography key={idx} variant="subtitle2">
                            - {r}
                          </Typography>
                        ))}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Skills:</Typography>
                        {e.skills.map((s, idx) => (
                          <Typography key={idx} variant="subtitle2">
                            - {s}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </ContentTemplate>
            <ContentTemplate title="Education">
              <Box display="flex" gap={5}>
                <Box>
                  {data.educations.map((e, idx) => (
                    <Typography key={idx} variant="subtitle2">
                      - {e.institute}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  {data.educations.map((e, idx) => (
                    <Typography key={idx} variant="subtitle2" color="gray">
                      {e.from_date} - {e.to_date}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </ContentTemplate>
            <ContentTemplate title="Skills">
              <table>
                <tbody style={{ verticalAlign: 'top' }}>
                  <tr>
                    <td>
                      <Typography variant="subtitle2">Programming Language</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">:</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">
                        {data.skills.programming_language.join(', ')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="subtitle2">Tech Stack</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">:</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">
                        {data.skills.tech_stack.join(', ')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="subtitle2">Database</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">:</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">{data.skills.database.join(', ')}</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </ContentTemplate>
          </Box>
        )}
        {/* <Box id="footer" position="static" bottom={0} right={0}>
          <Typography variant="caption">Created By Daffa Akbar</Typography>
        </Box> */}
      </PaperA4>
    </PrintPreview>
  )
}
