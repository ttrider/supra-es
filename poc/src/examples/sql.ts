export default `<?xml version="1.0" encoding="utf-8"?>
<ShowPlanXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" Version="1.2" Build="11.0.2100.60" 
  xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan">
  <BatchSequence>
    <Batch>
      <Statements>
        <StmtSimple StatementCompId="1" StatementEstRows="1" StatementId="1" StatementOptmLevel="FULL" StatementOptmEarlyAbortReason="GoodEnoughPlanFound" StatementSubTreeCost="0.00328854" StatementText="if exists (select * from [prot].[Table00000])&#xD;" StatementType="COND WITH QUERY" QueryHash="0x39FCC03146E4E20F" QueryPlanHash="0xE4F17D9A779E6527" RetrievedFromCache="false">
          <StatementSetOptions ANSI_NULLS="true" ANSI_PADDING="true" ANSI_WARNINGS="true" ARITHABORT="true" CONCAT_NULL_YIELDS_NULL="true" NUMERIC_ROUNDABORT="false" QUOTED_IDENTIFIER="true" />
          <QueryPlan DegreeOfParallelism="1" CachedPlanSize="16" CompileTime="0" CompileCPU="0" CompileMemory="160">
            <MemoryGrantInfo SerialRequiredMemory="0" SerialDesiredMemory="0" />
            <OptimizerHardwareDependentProperties EstimatedAvailableMemoryGrant="52428" EstimatedPagesCached="13107" EstimatedAvailableDegreeOfParallelism="2" />
            <RelOp AvgRowSize="11" EstimateCPU="1E-07" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Compute Scalar" NodeId="0" Parallel="false" PhysicalOp="Compute Scalar" EstimatedTotalSubtreeCost="0.00328854">
              <OutputList>
                <ColumnReference Column="Expr1004" />
              </OutputList>
              <ComputeScalar>
                <DefinedValues>
                  <DefinedValue>
                    <ColumnReference Column="Expr1004" />
                    <ScalarOperator ScalarString="CASE WHEN [Expr1005] THEN (1) ELSE (0) END">
                      <IF>
                        <Condition>
                          <ScalarOperator>
                            <Identifier>
                              <ColumnReference Column="Expr1005" />
                            </Identifier>
                          </ScalarOperator>
                        </Condition>
                        <Then>
                          <ScalarOperator>
                            <Const ConstValue="(1)" />
                          </ScalarOperator>
                        </Then>
                        <Else>
                          <ScalarOperator>
                            <Const ConstValue="(0)" />
                          </ScalarOperator>
                        </Else>
                      </IF>
                    </ScalarOperator>
                  </DefinedValue>
                </DefinedValues>
                <RelOp AvgRowSize="9" EstimateCPU="4.18E-06" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Left Semi Join" NodeId="1" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.00328844">
                  <OutputList>
                    <ColumnReference Column="Expr1005" />
                  </OutputList>
                  <RunTimeInformation>
                    <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                  </RunTimeInformation>
                  <NestedLoops Optimized="false">
                    <DefinedValues>
                      <DefinedValue>
                        <ColumnReference Column="Expr1005" />
                      </DefinedValue>
                    </DefinedValues>
                    <ProbeColumn>
                      <ColumnReference Column="Expr1005" />
                    </ProbeColumn>
                    <RelOp AvgRowSize="9" EstimateCPU="1.157E-06" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Constant Scan" NodeId="2" Parallel="false" PhysicalOp="Constant Scan" EstimatedTotalSubtreeCost="1.157E-06">
                      <OutputList />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                      </RunTimeInformation>
                      <ConstantScan />
                    </RelOp>
                    <RelOp AvgRowSize="9" EstimateCPU="0.002357" EstimateIO="0.0364583" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Clustered Index Scan" NodeId="3" Parallel="false" PhysicalOp="Clustered Index Scan" EstimatedTotalSubtreeCost="0.0032831" TableCardinality="2000">
                      <OutputList />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="0" ActualExecutions="1" />
                      </RunTimeInformation>
                      <IndexScan Ordered="false" ForcedIndex="false" ForceScan="false" NoExpandHint="false">
                        <DefinedValues />
                        <Object Database="[TestDB]" Schema="[prot]" Table="[Table00000]" Index="[PK__Table000__66F947B74D60F3C1]" IndexKind="Clustered" />
                      </IndexScan>
                    </RelOp>
                  </NestedLoops>
                </RelOp>
              </ComputeScalar>
            </RelOp>
          </QueryPlan>
        </StmtSimple>
      </Statements>
    </Batch>
    <Batch>
      <Statements>
        <StmtSimple StatementCompId="1" StatementEstRows="1" StatementId="1" StatementOptmLevel="FULL" StatementOptmEarlyAbortReason="GoodEnoughPlanFound" StatementSubTreeCost="0.00328854" StatementText="if exists (select * from [prot].[Table00000])&#xD;" StatementType="COND WITH QUERY" QueryHash="0x39FCC03146E4E20F" QueryPlanHash="0xE4F17D9A779E6527" RetrievedFromCache="false">
          <StatementSetOptions ANSI_NULLS="true" ANSI_PADDING="true" ANSI_WARNINGS="true" ARITHABORT="true" CONCAT_NULL_YIELDS_NULL="true" NUMERIC_ROUNDABORT="false" QUOTED_IDENTIFIER="true" />
          <QueryPlan DegreeOfParallelism="1" CachedPlanSize="16" CompileTime="0" CompileCPU="0" CompileMemory="160">
            <MemoryGrantInfo SerialRequiredMemory="0" SerialDesiredMemory="0" />
            <OptimizerHardwareDependentProperties EstimatedAvailableMemoryGrant="52428" EstimatedPagesCached="13107" EstimatedAvailableDegreeOfParallelism="2" />
            <RelOp AvgRowSize="11" EstimateCPU="1E-07" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Compute Scalar" NodeId="0" Parallel="false" PhysicalOp="Compute Scalar" EstimatedTotalSubtreeCost="0.00328854">
              <OutputList>
                <ColumnReference Column="Expr1004" />
              </OutputList>
              <ComputeScalar>
                <DefinedValues>
                  <DefinedValue>
                    <ColumnReference Column="Expr1004" />
                    <ScalarOperator ScalarString="CASE WHEN [Expr1005] THEN (1) ELSE (0) END">
                      <IF>
                        <Condition>
                          <ScalarOperator>
                            <Identifier>
                              <ColumnReference Column="Expr1005" />
                            </Identifier>
                          </ScalarOperator>
                        </Condition>
                        <Then>
                          <ScalarOperator>
                            <Const ConstValue="(1)" />
                          </ScalarOperator>
                        </Then>
                        <Else>
                          <ScalarOperator>
                            <Const ConstValue="(0)" />
                          </ScalarOperator>
                        </Else>
                      </IF>
                    </ScalarOperator>
                  </DefinedValue>
                </DefinedValues>
                <RelOp AvgRowSize="9" EstimateCPU="4.18E-06" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Left Semi Join" NodeId="1" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.00328844">
                  <OutputList>
                    <ColumnReference Column="Expr1005" />
                  </OutputList>
                  <RunTimeInformation>
                    <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                  </RunTimeInformation>
                  <NestedLoops Optimized="false">
                    <DefinedValues>
                      <DefinedValue>
                        <ColumnReference Column="Expr1005" />
                      </DefinedValue>
                    </DefinedValues>
                    <ProbeColumn>
                      <ColumnReference Column="Expr1005" />
                    </ProbeColumn>
                    <RelOp AvgRowSize="9" EstimateCPU="1.157E-06" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Constant Scan" NodeId="2" Parallel="false" PhysicalOp="Constant Scan" EstimatedTotalSubtreeCost="1.157E-06">
                      <OutputList />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                      </RunTimeInformation>
                      <ConstantScan />
                    </RelOp>
                    <RelOp AvgRowSize="9" EstimateCPU="0.002357" EstimateIO="0.0364583" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Clustered Index Scan" NodeId="3" Parallel="false" PhysicalOp="Clustered Index Scan" EstimatedTotalSubtreeCost="0.0032831" TableCardinality="2000">
                      <OutputList />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="0" ActualExecutions="1" />
                      </RunTimeInformation>
                      <IndexScan Ordered="false" ForcedIndex="false" ForceScan="false" NoExpandHint="false">
                        <DefinedValues />
                        <Object Database="[TestDB]" Schema="[prot]" Table="[Table00000]" Index="[PK__Table000__66F947B74D60F3C1]" IndexKind="Clustered" />
                      </IndexScan>
                    </RelOp>
                  </NestedLoops>
                </RelOp>
              </ComputeScalar>
            </RelOp>
          </QueryPlan>
        </StmtSimple>
        <StmtSimple StatementCompId="1" StatementEstRows="1" StatementId="1" StatementOptmLevel="FULL" StatementOptmEarlyAbortReason="GoodEnoughPlanFound" StatementSubTreeCost="0.00328854" StatementText="if exists (select * from [prot].[Table00000])&#xD;" StatementType="COND WITH QUERY" QueryHash="0x39FCC03146E4E20F" QueryPlanHash="0xE4F17D9A779E6527" RetrievedFromCache="false">
          <StatementSetOptions ANSI_NULLS="true" ANSI_PADDING="true" ANSI_WARNINGS="true" ARITHABORT="true" CONCAT_NULL_YIELDS_NULL="true" NUMERIC_ROUNDABORT="false" QUOTED_IDENTIFIER="true" />
          <QueryPlan DegreeOfParallelism="1" CachedPlanSize="16" CompileTime="0" CompileCPU="0" CompileMemory="160">
            <MemoryGrantInfo SerialRequiredMemory="0" SerialDesiredMemory="0" />
            <OptimizerHardwareDependentProperties EstimatedAvailableMemoryGrant="52428" EstimatedPagesCached="13107" EstimatedAvailableDegreeOfParallelism="2" />
            <RelOp AvgRowSize="11" EstimateCPU="1E-07" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Compute Scalar" NodeId="0" Parallel="false" PhysicalOp="Compute Scalar" EstimatedTotalSubtreeCost="0.00328854">
              <OutputList>
                <ColumnReference Column="Expr1004" />
              </OutputList>
              <ComputeScalar>
                <DefinedValues>
                  <DefinedValue>
                    <ColumnReference Column="Expr1004" />
                    <ScalarOperator ScalarString="CASE WHEN [Expr1005] THEN (1) ELSE (0) END">
                      <IF>
                        <Condition>
                          <ScalarOperator>
                            <Identifier>
                              <ColumnReference Column="Expr1005" />
                            </Identifier>
                          </ScalarOperator>
                        </Condition>
                        <Then>
                          <ScalarOperator>
                            <Const ConstValue="(1)" />
                          </ScalarOperator>
                        </Then>
                        <Else>
                          <ScalarOperator>
                            <Const ConstValue="(0)" />
                          </ScalarOperator>
                        </Else>
                      </IF>
                    </ScalarOperator>
                  </DefinedValue>
                </DefinedValues>
                <RelOp AvgRowSize="9" EstimateCPU="4.18E-06" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Left Semi Join" NodeId="1" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.00328844">
                  <OutputList>
                    <ColumnReference Column="Expr1005" />
                  </OutputList>
                  <RunTimeInformation>
                    <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                  </RunTimeInformation>
                  <NestedLoops Optimized="false">
                    <DefinedValues>
                      <DefinedValue>
                        <ColumnReference Column="Expr1005" />
                      </DefinedValue>
                    </DefinedValues>
                    <ProbeColumn>
                      <ColumnReference Column="Expr1005" />
                    </ProbeColumn>
                    <RelOp AvgRowSize="9" EstimateCPU="1.157E-06" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Constant Scan" NodeId="2" Parallel="false" PhysicalOp="Constant Scan" EstimatedTotalSubtreeCost="1.157E-06">
                      <OutputList />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                      </RunTimeInformation>
                      <ConstantScan />
                    </RelOp>
                    <RelOp AvgRowSize="9" EstimateCPU="0.002357" EstimateIO="0.0364583" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Clustered Index Scan" NodeId="3" Parallel="false" PhysicalOp="Clustered Index Scan" EstimatedTotalSubtreeCost="0.0032831" TableCardinality="2000">
                      <OutputList />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="0" ActualExecutions="1" />
                      </RunTimeInformation>
                      <IndexScan Ordered="false" ForcedIndex="false" ForceScan="false" NoExpandHint="false">
                        <DefinedValues />
                        <Object Database="[TestDB]" Schema="[prot]" Table="[Table00000]" Index="[PK__Table000__66F947B74D60F3C1]" IndexKind="Clustered" />
                      </IndexScan>
                    </RelOp>
                  </NestedLoops>
                </RelOp>
              </ComputeScalar>
            </RelOp>
          </QueryPlan>
        </StmtSimple>
      </Statements>
    </Batch>
  </BatchSequence>
</ShowPlanXML>`;