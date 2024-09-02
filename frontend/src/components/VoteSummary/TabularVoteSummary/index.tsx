import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserVoteComponentProps } from '@/types'

const TabularVoteSummary = ({votes}: {votes: UserVoteComponentProps[]}) => {
  const groupedVotes = votes.reduce((acc, vote) => {
    const key = vote?.vote ? vote?.vote.toString() : '-'
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(vote.name)
    return acc
  }, {} as Record<string, string[]>)

  const sortedVoteGroups = Object.entries(groupedVotes).sort((a, b) => {
    const voteA = isNaN(Number(a[0])) ? Infinity : Number(a[0])
    const voteB = isNaN(Number(b[0])) ? Infinity : Number(b[0])
    return voteA - voteB
  })

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Vote Summary</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Vote</TableHead>
            <TableHead>Voters</TableHead>
            <TableHead className="text-right">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVoteGroups.map(([vote, voters]) => (
            <TableRow key={vote}>
              <TableCell className="font-medium">{ vote }</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {voters.map((voter, index) => (
                    <Badge key={index} variant="outline">
                      {voter}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">{voters.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TabularVoteSummary