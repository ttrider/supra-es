export default `<?xml version="1.0" encoding="utf-16"?>
<ShowPlanXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" Version="1.2" Build="12.0.2269.0" xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan">
  <BatchSequence>
    <Batch>
      <Statements>
        <StmtSimple StatementCompId="1" StatementEstRows="1174.94" StatementId="1" StatementOptmLevel="FULL" StatementOptmEarlyAbortReason="GoodEnoughPlanFound" CardinalityEstimationModelVersion="120" StatementSubTreeCost="0.123034" StatementText="SELECT * FROM sys.objects ORDER BY [object_id]" StatementType="SELECT" QueryHash="0x8721D53C24F7D6C8" QueryPlanHash="0x2B01C2D47E00F846" RetrievedFromCache="true">
          <StatementSetOptions ANSI_NULLS="true" ANSI_PADDING="true" ANSI_WARNINGS="true" ARITHABORT="true" CONCAT_NULL_YIELDS_NULL="true" NUMERIC_ROUNDABORT="false" QUOTED_IDENTIFIER="true" />
          <QueryPlan DegreeOfParallelism="0" NonParallelPlanReason="CouldNotGenerateValidParallelPlan" MemoryGrant="3328" CachedPlanSize="112" CompileTime="10" CompileCPU="10" CompileMemory="920">
            <MemoryGrantInfo SerialRequiredMemory="2560" SerialDesiredMemory="3328" RequiredMemory="2560" DesiredMemory="3328" RequestedMemory="3328" GrantWaitTime="0" GrantedMemory="3328" MaxUsedMemory="376" />
            <OptimizerHardwareDependentProperties EstimatedAvailableMemoryGrant="104847" EstimatedPagesCached="157270" EstimatedAvailableDegreeOfParallelism="12" />
            <RelOp AvgRowSize="237" EstimateCPU="0.0187929" EstimateIO="0.0112613" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1174.94" LogicalOp="Sort" NodeId="0" Parallel="false" PhysicalOp="Sort" EstimatedTotalSubtreeCost="0.123034">
              <OutputList>
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                <ColumnReference Column="Expr1003" />
                <ColumnReference Column="Expr1006" />
                <ColumnReference Column="Expr1007" />
              </OutputList>
              <MemoryFractions Input="0.833333" Output="1" />
              <RunTimeInformation>
                <RunTimeCountersPerThread Thread="0" ActualRebinds="1" ActualRewinds="0" ActualRows="99" ActualEndOfScans="1" ActualExecutions="1" />
              </RunTimeInformation>
              <Sort Distinct="false">
                <OrderBy>
                  <OrderByColumn Ascending="true">
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                  </OrderByColumn>
                </OrderBy>
                <RelOp AvgRowSize="237" EstimateCPU="0.0280709" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1174.94" LogicalOp="Right Outer Join" NodeId="1" Parallel="false" PhysicalOp="Hash Match" EstimatedTotalSubtreeCost="0.0929803">
                  <OutputList>
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                    <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                    <ColumnReference Column="Expr1003" />
                    <ColumnReference Column="Expr1006" />
                    <ColumnReference Column="Expr1007" />
                  </OutputList>
                  <MemoryFractions Input="0.5" Output="0.0833333" />
                  <RunTimeInformation>
                    <RunTimeCountersPerThread Thread="0" ActualRows="99" ActualEndOfScans="1" ActualExecutions="1" />
                  </RunTimeInformation>
                  <Hash>
                    <DefinedValues />
                    <HashKeysBuild>
                      <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="value" />
                    </HashKeysBuild>
                    <HashKeysProbe>
                      <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                    </HashKeysProbe>
                    <ProbeResidual>
                      <ScalarOperator ScalarString="[mssqlsystemresource].[sys].[syspalnames].[value] as [n].[value]=[master].[sys].[sysschobjs].[type] as [o].[type]">
                        <Compare CompareOp="EQ">
                          <ScalarOperator>
                            <Identifier>
                              <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="value" />
                            </Identifier>
                          </ScalarOperator>
                          <ScalarOperator>
                            <Identifier>
                              <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                            </Identifier>
                          </ScalarOperator>
                        </Compare>
                      </ScalarOperator>
                    </ProbeResidual>
                    <RelOp AvgRowSize="75" EstimateCPU="0.0001889" EstimateIO="0.003125" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="29" LogicalOp="Clustered Index Seek" NodeId="2" Parallel="false" PhysicalOp="Clustered Index Seek" EstimatedTotalSubtreeCost="0.0033139" TableCardinality="134">
                      <OutputList>
                        <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="value" />
                        <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                      </OutputList>
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="29" ActualEndOfScans="1" ActualExecutions="1" />
                      </RunTimeInformation>
                      <IndexScan Ordered="true" ScanDirection="FORWARD" ForcedIndex="false" ForceSeek="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                        <DefinedValues>
                          <DefinedValue>
                            <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="value" />
                          </DefinedValue>
                          <DefinedValue>
                            <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                          </DefinedValue>
                        </DefinedValues>
                        <Object Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Index="[cl]" Alias="[n]" IndexKind="Clustered" Storage="RowStore" />
                        <SeekPredicates>
                          <SeekPredicateNew>
                            <SeekKeys>
                              <Prefix ScanType="EQ">
                                <RangeColumns>
                                  <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="class" />
                                </RangeColumns>
                                <RangeExpressions>
                                  <ScalarOperator ScalarString="'OBTY'">
                                    <Const ConstValue="'OBTY'" />
                                  </ScalarOperator>
                                </RangeExpressions>
                              </Prefix>
                            </SeekKeys>
                          </SeekPredicateNew>
                        </SeekPredicates>
                      </IndexScan>
                    </RelOp>
                    <RelOp AvgRowSize="175" EstimateCPU="0.0239203" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1140.57" LogicalOp="Right Outer Join" NodeId="3" Parallel="false" PhysicalOp="Hash Match" EstimatedTotalSubtreeCost="0.0615925">
                      <OutputList>
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                        <ColumnReference Column="Expr1003" />
                        <ColumnReference Column="Expr1006" />
                        <ColumnReference Column="Expr1007" />
                      </OutputList>
                      <MemoryFractions Input="0.5" Output="0.0833333" />
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="99" ActualEndOfScans="1" ActualExecutions="1" />
                      </RunTimeInformation>
                      <Hash>
                        <DefinedValues />
                        <HashKeysBuild>
                          <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depid" />
                        </HashKeysBuild>
                        <HashKeysProbe>
                          <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                        </HashKeysProbe>
                        <RelOp AvgRowSize="20" EstimateCPU="0.0003693" EstimateIO="0.003125" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="7.15656" LogicalOp="Index Scan" NodeId="4" Parallel="false" PhysicalOp="Index Scan" EstimatedTotalSubtreeCost="0.0034943" TableCardinality="193">
                          <OutputList>
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depid" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                          </OutputList>
                          <RunTimeInformation>
                            <RunTimeCountersPerThread Thread="0" ActualRows="0" ActualEndOfScans="1" ActualExecutions="1" />
                          </RunTimeInformation>
                          <IndexScan Ordered="false" ForcedIndex="false" ForceSeek="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                            <DefinedValues>
                              <DefinedValue>
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depid" />
                              </DefinedValue>
                              <DefinedValue>
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                              </DefinedValue>
                            </DefinedValues>
                            <Object Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Index="[nc1]" Alias="[r]" IndexKind="NonClustered" Storage="RowStore" />
                            <Predicate>
                              <ScalarOperator ScalarString="[master].[sys].[syssingleobjrefs].[class] as [r].[class]=(97) AND [master].[sys].[syssingleobjrefs].[depsubid] as [r].[depsubid]=(0)">
                                <Logical Operation="AND">
                                  <ScalarOperator>
                                    <Compare CompareOp="EQ">
                                      <ScalarOperator>
                                        <Identifier>
                                          <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="class" />
                                        </Identifier>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Const ConstValue="(97)" />
                                      </ScalarOperator>
                                    </Compare>
                                  </ScalarOperator>
                                  <ScalarOperator>
                                    <Compare CompareOp="EQ">
                                      <ScalarOperator>
                                        <Identifier>
                                          <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depsubid" />
                                        </Identifier>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Const ConstValue="(0)" />
                                      </ScalarOperator>
                                    </Compare>
                                  </ScalarOperator>
                                </Logical>
                              </ScalarOperator>
                            </Predicate>
                          </IndexScan>
                        </RelOp>
                        <RelOp AvgRowSize="171" EstimateCPU="0.00428452" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1139.5" LogicalOp="Filter" NodeId="5" Parallel="false" PhysicalOp="Filter" EstimatedTotalSubtreeCost="0.034005">
                          <OutputList>
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                            <ColumnReference Column="Expr1003" />
                            <ColumnReference Column="Expr1006" />
                            <ColumnReference Column="Expr1007" />
                          </OutputList>
                          <RunTimeInformation>
                            <RunTimeCountersPerThread Thread="0" ActualRows="99" ActualEndOfScans="1" ActualExecutions="1" />
                          </RunTimeInformation>
                          <Filter StartupExpression="false">
                            <RelOp AvgRowSize="173" EstimateCPU="0.0002279" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1139.5" LogicalOp="Compute Scalar" NodeId="6" Parallel="false" PhysicalOp="Compute Scalar" EstimatedTotalSubtreeCost="0.0297205">
                              <OutputList>
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                                <ColumnReference Column="Expr1003" />
                                <ColumnReference Column="Expr1006" />
                                <ColumnReference Column="Expr1007" />
                              </OutputList>
                              <ComputeScalar>
                                <DefinedValues>
                                  <DefinedValue>
                                    <ColumnReference Column="Expr1003" />
                                    <ScalarOperator ScalarString="CONVERT(bit,[master].[sys].[sysschobjs].[status] as [o].[status]&amp;(1),0)">
                                      <Convert DataType="bit" Style="0" Implicit="false">
                                        <ScalarOperator>
                                          <Arithmetic Operation="BIT_AND">
                                            <ScalarOperator>
                                              <Identifier>
                                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                              </Identifier>
                                            </ScalarOperator>
                                            <ScalarOperator>
                                              <Const ConstValue="(1)" />
                                            </ScalarOperator>
                                          </Arithmetic>
                                        </ScalarOperator>
                                      </Convert>
                                    </ScalarOperator>
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Column="Expr1006" />
                                    <ScalarOperator ScalarString="CONVERT(bit,[master].[sys].[sysschobjs].[status] as [o].[status]&amp;(16),0)">
                                      <Convert DataType="bit" Style="0" Implicit="false">
                                        <ScalarOperator>
                                          <Arithmetic Operation="BIT_AND">
                                            <ScalarOperator>
                                              <Identifier>
                                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                              </Identifier>
                                            </ScalarOperator>
                                            <ScalarOperator>
                                              <Const ConstValue="(16)" />
                                            </ScalarOperator>
                                          </Arithmetic>
                                        </ScalarOperator>
                                      </Convert>
                                    </ScalarOperator>
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Column="Expr1007" />
                                    <ScalarOperator ScalarString="CONVERT(bit,[master].[sys].[sysschobjs].[status] as [o].[status]&amp;(64),0)">
                                      <Convert DataType="bit" Style="0" Implicit="false">
                                        <ScalarOperator>
                                          <Arithmetic Operation="BIT_AND">
                                            <ScalarOperator>
                                              <Identifier>
                                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                              </Identifier>
                                            </ScalarOperator>
                                            <ScalarOperator>
                                              <Const ConstValue="(64)" />
                                            </ScalarOperator>
                                          </Arithmetic>
                                        </ScalarOperator>
                                      </Convert>
                                    </ScalarOperator>
                                  </DefinedValue>
                                </DefinedValues>
                                <RelOp AvgRowSize="180" EstimateCPU="0.0026639" EstimateIO="0.0268287" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1139.5" LogicalOp="Clustered Index Scan" NodeId="7" Parallel="false" PhysicalOp="Clustered Index Scan" EstimatedTotalSubtreeCost="0.0294926" TableCardinality="2279">
                                  <OutputList>
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                                  </OutputList>
                                  <RunTimeInformation>
                                    <RunTimeCountersPerThread Thread="0" ActualRows="2273" ActualEndOfScans="1" ActualExecutions="1" />
                                  </RunTimeInformation>
                                  <IndexScan Ordered="false" ForcedIndex="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                                    <DefinedValues>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                                      </DefinedValue>
                                    </DefinedValues>
                                    <Object Database="[master]" Schema="[sys]" Table="[sysschobjs]" Index="[clst]" Alias="[o]" IndexKind="Clustered" Storage="RowStore" />
                                    <Predicate>
                                      <ScalarOperator ScalarString="[master].[sys].[sysschobjs].[nsclass] as [o].[nsclass]=(0) AND [master].[sys].[sysschobjs].[pclass] as [o].[pclass]=(1) AND CONVERT(bit,[master].[sys].[sysschobjs].[status2] as [o].[status2]&amp;(32),0)=(0)">
                                        <Logical Operation="AND">
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Identifier>
                                                  <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsclass" />
                                                </Identifier>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="(0)" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Identifier>
                                                  <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pclass" />
                                                </Identifier>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="(1)" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Convert DataType="bit" Style="0" Implicit="false">
                                                  <ScalarOperator>
                                                    <Arithmetic Operation="BIT_AND">
                                                      <ScalarOperator>
                                                        <Identifier>
                                                          <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status2" />
                                                        </Identifier>
                                                      </ScalarOperator>
                                                      <ScalarOperator>
                                                        <Const ConstValue="(32)" />
                                                      </ScalarOperator>
                                                    </Arithmetic>
                                                  </ScalarOperator>
                                                </Convert>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="(0)" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                        </Logical>
                                      </ScalarOperator>
                                    </Predicate>
                                  </IndexScan>
                                </RelOp>
                              </ComputeScalar>
                            </RelOp>
                            <Predicate>
                              <ScalarOperator ScalarString="has_access('CO',[master].[sys].[sysschobjs].[id] as [o].[id])=(1)">
                                <Compare CompareOp="EQ">
                                  <ScalarOperator>
                                    <Intrinsic FunctionName="has_access">
                                      <ScalarOperator>
                                        <Const ConstValue="'CO'" />
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Identifier>
                                          <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                        </Identifier>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Const ConstValue="" />
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Const ConstValue="" />
                                      </ScalarOperator>
                                    </Intrinsic>
                                  </ScalarOperator>
                                  <ScalarOperator>
                                    <Const ConstValue="(1)" />
                                  </ScalarOperator>
                                </Compare>
                              </ScalarOperator>
                            </Predicate>
                          </Filter>
                        </RelOp>
                      </Hash>
                    </RelOp>
                  </Hash>
                </RelOp>
              </Sort>
            </RelOp>
          </QueryPlan>
        </StmtSimple>
      </Statements>
    </Batch>
    <Batch>
      <Statements>
        <StmtSimple StatementCompId="2" StatementEstRows="1" StatementId="2" StatementOptmLevel="FULL" StatementOptmEarlyAbortReason="GoodEnoughPlanFound" CardinalityEstimationModelVersion="120" StatementSubTreeCost="0.0506244" StatementText="SELECT [type], count(*) from sys.tables GROUP BY [type]" StatementType="SELECT" QueryHash="0x1267A76DF975F76A" QueryPlanHash="0xC7C92798A79A8D4E" RetrievedFromCache="true">
          <StatementSetOptions ANSI_NULLS="true" ANSI_PADDING="true" ANSI_WARNINGS="true" ARITHABORT="true" CONCAT_NULL_YIELDS_NULL="true" NUMERIC_ROUNDABORT="false" QUOTED_IDENTIFIER="true" />
          <QueryPlan DegreeOfParallelism="0" NonParallelPlanReason="CouldNotGenerateValidParallelPlan" CachedPlanSize="40" CompileTime="8" CompileCPU="8" CompileMemory="1056">
            <MemoryGrantInfo SerialRequiredMemory="0" SerialDesiredMemory="0" />
            <OptimizerHardwareDependentProperties EstimatedAvailableMemoryGrant="104847" EstimatedPagesCached="157270" EstimatedAvailableDegreeOfParallelism="12" />
            <RelOp AvgRowSize="13" EstimateCPU="1.39058E-05" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Compute Scalar" NodeId="0" Parallel="false" PhysicalOp="Compute Scalar" EstimatedTotalSubtreeCost="0.0506244">
              <OutputList>
                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                <ColumnReference Column="Expr1048" />
              </OutputList>
              <ComputeScalar>
                <DefinedValues>
                  <DefinedValue>
                    <ColumnReference Column="Expr1048" />
                    <ScalarOperator ScalarString="CONVERT_IMPLICIT(int,[Expr1049],0)">
                      <Convert DataType="int" Style="0" Implicit="true">
                        <ScalarOperator>
                          <Identifier>
                            <ColumnReference Column="Expr1049" />
                          </Identifier>
                        </ScalarOperator>
                      </Convert>
                    </ScalarOperator>
                  </DefinedValue>
                </DefinedValues>
                <RelOp AvgRowSize="13" EstimateCPU="1.39058E-05" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Aggregate" NodeId="1" Parallel="false" PhysicalOp="Stream Aggregate" EstimatedTotalSubtreeCost="0.0506244">
                  <OutputList>
                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                    <ColumnReference Column="Expr1049" />
                  </OutputList>
                  <RunTimeInformation>
                    <RunTimeCountersPerThread Thread="0" ActualRows="1" ActualEndOfScans="1" ActualExecutions="1" />
                  </RunTimeInformation>
                  <StreamAggregate>
                    <DefinedValues>
                      <DefinedValue>
                        <ColumnReference Column="Expr1049" />
                        <ScalarOperator ScalarString="Count(*)">
                          <Aggregate AggType="countstar" Distinct="false" />
                        </ScalarOperator>
                      </DefinedValue>
                      <DefinedValue>
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                        <ScalarOperator ScalarString="ANY([master].[sys].[sysschobjs].[type] as [o].[type])">
                          <Aggregate AggType="ANY" Distinct="false">
                            <ScalarOperator>
                              <Identifier>
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                              </Identifier>
                            </ScalarOperator>
                          </Aggregate>
                        </ScalarOperator>
                      </DefinedValue>
                    </DefinedValues>
                    <RelOp AvgRowSize="9" EstimateCPU="6.26555E-05" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="22.343" LogicalOp="Left Outer Join" NodeId="2" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.0506105">
                      <OutputList>
                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                      </OutputList>
                      <RunTimeInformation>
                        <RunTimeCountersPerThread Thread="0" ActualRows="5" ActualEndOfScans="1" ActualExecutions="1" />
                      </RunTimeInformation>
                      <NestedLoops Optimized="false">
                        <OuterReferences>
                          <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                        </OuterReferences>
                        <RelOp AvgRowSize="13" EstimateCPU="0.00340886" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="14.9894" LogicalOp="Left Outer Join" NodeId="3" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.0450531">
                          <OutputList>
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                            <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                          </OutputList>
                          <RunTimeInformation>
                            <RunTimeCountersPerThread Thread="0" ActualRows="5" ActualEndOfScans="1" ActualExecutions="1" />
                          </RunTimeInformation>
                          <NestedLoops Optimized="false">
                            <Predicate>
                              <ScalarOperator ScalarString="[master].[sys].[sysidxstats].[id] as [lob].[id]=[master].[sys].[sysschobjs].[id] as [o].[id]">
                                <Compare CompareOp="EQ">
                                  <ScalarOperator>
                                    <Identifier>
                                      <ColumnReference Database="[master]" Schema="[sys]" Table="[sysidxstats]" Alias="[lob]" Column="id" />
                                    </Identifier>
                                  </ScalarOperator>
                                  <ScalarOperator>
                                    <Identifier>
                                      <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                    </Identifier>
                                  </ScalarOperator>
                                </Compare>
                              </ScalarOperator>
                            </Predicate>
                            <RelOp AvgRowSize="13" EstimateCPU="0.00428452" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="7.00615" LogicalOp="Filter" NodeId="4" Parallel="false" PhysicalOp="Filter" EstimatedTotalSubtreeCost="0.0337771">
                              <OutputList>
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                              </OutputList>
                              <RunTimeInformation>
                                <RunTimeCountersPerThread Thread="0" ActualRows="5" ActualEndOfScans="1" ActualExecutions="1" />
                              </RunTimeInformation>
                              <Filter StartupExpression="false">
                                <RelOp AvgRowSize="15" EstimateCPU="0.0026639" EstimateIO="0.0268287" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="7.00615" LogicalOp="Clustered Index Scan" NodeId="5" Parallel="false" PhysicalOp="Clustered Index Scan" EstimatedTotalSubtreeCost="0.0294926" TableCardinality="2279">
                                  <OutputList>
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                  </OutputList>
                                  <RunTimeInformation>
                                    <RunTimeCountersPerThread Thread="0" ActualRows="7" ActualEndOfScans="1" ActualExecutions="1" />
                                  </RunTimeInformation>
                                  <IndexScan Ordered="false" ForcedIndex="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                                    <DefinedValues>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                      </DefinedValue>
                                      <DefinedValue>
                                        <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                      </DefinedValue>
                                    </DefinedValues>
                                    <Object Database="[master]" Schema="[sys]" Table="[sysschobjs]" Index="[clst]" Alias="[o]" IndexKind="Clustered" Storage="RowStore" />
                                    <Predicate>
                                      <ScalarOperator ScalarString="[master].[sys].[sysschobjs].[nsclass] as [o].[nsclass]=(0) AND [master].[sys].[sysschobjs].[pclass] as [o].[pclass]=(1) AND [master].[sys].[sysschobjs].[type] as [o].[type]='U'">
                                        <Logical Operation="AND">
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Identifier>
                                                  <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsclass" />
                                                </Identifier>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="(0)" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Identifier>
                                                  <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pclass" />
                                                </Identifier>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="(1)" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Identifier>
                                                  <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                                </Identifier>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="'U'" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                        </Logical>
                                      </ScalarOperator>
                                    </Predicate>
                                  </IndexScan>
                                </RelOp>
                                <Predicate>
                                  <ScalarOperator ScalarString="has_access('CO',[master].[sys].[sysschobjs].[id] as [o].[id])=(1)">
                                    <Compare CompareOp="EQ">
                                      <ScalarOperator>
                                        <Intrinsic FunctionName="has_access">
                                          <ScalarOperator>
                                            <Const ConstValue="'CO'" />
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Identifier>
                                              <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                            </Identifier>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Const ConstValue="" />
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Const ConstValue="" />
                                          </ScalarOperator>
                                        </Intrinsic>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Const ConstValue="(1)" />
                                      </ScalarOperator>
                                    </Compare>
                                  </ScalarOperator>
                                </Predicate>
                              </Filter>
                            </RelOp>
                            <RelOp AvgRowSize="15" EstimateCPU="0.000421" EstimateIO="0.00386574" EstimateRebinds="0" EstimateRewinds="6.00615" EstimatedExecutionMode="Row" EstimateRows="116.4" LogicalOp="Index Scan" NodeId="7" Parallel="false" PhysicalOp="Index Scan" EstimatedTotalSubtreeCost="0.00681533" TableCardinality="240">
                              <OutputList>
                                <ColumnReference Database="[master]" Schema="[sys]" Table="[sysidxstats]" Alias="[lob]" Column="id" />
                              </OutputList>
                              <RunTimeInformation>
                                <RunTimeCountersPerThread Thread="0" ActualRows="485" ActualEndOfScans="5" ActualExecutions="5" />
                              </RunTimeInformation>
                              <IndexScan Ordered="false" ForcedIndex="false" ForceSeek="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                                <DefinedValues>
                                  <DefinedValue>
                                    <ColumnReference Database="[master]" Schema="[sys]" Table="[sysidxstats]" Alias="[lob]" Column="id" />
                                  </DefinedValue>
                                </DefinedValues>
                                <Object Database="[master]" Schema="[sys]" Table="[sysidxstats]" Index="[nc]" Alias="[lob]" IndexKind="NonClustered" Storage="RowStore" />
                                <Predicate>
                                  <ScalarOperator ScalarString="[master].[sys].[sysidxstats].[indid] as [lob].[indid]&lt;=(1)">
                                    <Compare CompareOp="LE">
                                      <ScalarOperator>
                                        <Identifier>
                                          <ColumnReference Database="[master]" Schema="[sys]" Table="[sysidxstats]" Alias="[lob]" Column="indid" />
                                        </Identifier>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Const ConstValue="(1)" />
                                      </ScalarOperator>
                                    </Compare>
                                  </ScalarOperator>
                                </Predicate>
                              </IndexScan>
                            </RelOp>
                          </NestedLoops>
                        </RelOp>
                        <RelOp AvgRowSize="9" EstimateCPU="0.0001581" EstimateIO="0.003125" EstimateRebinds="9.87582" EstimateRewinds="4.11353" EstimatedExecutionMode="Row" EstimateRows="1" LogicalOp="Clustered Index Seek" NodeId="9" Parallel="false" PhysicalOp="Clustered Index Seek" EstimatedTotalSubtreeCost="0.00549482" TableCardinality="193">
                          <OutputList />
                          <RunTimeInformation>
                            <RunTimeCountersPerThread Thread="0" ActualRows="0" ActualEndOfScans="5" ActualExecutions="5" />
                          </RunTimeInformation>
                          <IndexScan Ordered="true" ScanDirection="FORWARD" ForcedIndex="false" ForceSeek="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                            <DefinedValues />
                            <Object Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Index="[clst]" Alias="[ds]" IndexKind="Clustered" Storage="RowStore" />
                            <SeekPredicates>
                              <SeekPredicateNew>
                                <SeekKeys>
                                  <Prefix ScanType="EQ">
                                    <RangeColumns>
                                      <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[ds]" Column="depid" />
                                      <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[ds]" Column="class" />
                                    </RangeColumns>
                                    <RangeExpressions>
                                      <ScalarOperator ScalarString="[master].[sys].[sysschobjs].[id] as [o].[id]">
                                        <Identifier>
                                          <ColumnReference Database="[master]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                        </Identifier>
                                      </ScalarOperator>
                                      <ScalarOperator ScalarString="(8)">
                                        <Const ConstValue="(8)" />
                                      </ScalarOperator>
                                    </RangeExpressions>
                                  </Prefix>
                                  <EndRange ScanType="LE">
                                    <RangeColumns>
                                      <ColumnReference Database="[master]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[ds]" Column="depsubid" />
                                    </RangeColumns>
                                    <RangeExpressions>
                                      <ScalarOperator ScalarString="(1)">
                                        <Const ConstValue="(1)" />
                                      </ScalarOperator>
                                    </RangeExpressions>
                                  </EndRange>
                                </SeekKeys>
                              </SeekPredicateNew>
                            </SeekPredicates>
                          </IndexScan>
                        </RelOp>
                      </NestedLoops>
                    </RelOp>
                  </StreamAggregate>
                </RelOp>
              </ComputeScalar>
            </RelOp>
          </QueryPlan>
        </StmtSimple>
      </Statements>
    </Batch>
  </BatchSequence>
</ShowPlanXML>`;