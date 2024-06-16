import { Card, CardContent, CardHeader, CardTitle } from 'shadcn/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'shadcn/table';
import { useExperiment } from '@/state/experiments/useExperiment';
import { formatDateTime } from 'helpers/formatters';

export const ActivityLog = ({ experimentId }) => {
  const { experiment } = useExperiment(experimentId);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow></TableRow>
          </TableHeader>
          <TableBody>
            {experiment?.activityLog.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <strong>{`${item.user?.firstName} ${item.user?.lastName}`} </strong>
                    <span>{item.message}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {/* {moment(item.createdAt).fromNow()} */}
                    {formatDateTime(item.createdAt)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
